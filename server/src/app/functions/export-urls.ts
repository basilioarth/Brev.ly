import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { db, pg } from '../../infra/db/index.ts';
import { schema } from '../../infra/db/schemas/index.ts';
import { uploadFileToStorage } from '../../infra/storage/upload-file-to-storage.ts';
import { type Either, makeRight } from '../../shared/either.ts';
import { stringify } from 'csv-stringify';

type ExportUrlsOutput = {
  reportUrl: string
}

export async function exportUrls(): Promise<Either<Error, ExportUrlsOutput>> {

  const { sql, params } = db
    .select({
      id: schema.urls.id,
      originalUrl: schema.urls.originalUrl,
      shortenedUrl: schema.urls.shortenedUrl,
      accessCount: schema.urls.accessCount,
      createdAt: schema.urls.createdAt,
    })
    .from(schema.urls)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor()

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'shortened_url', header: 'Short URL' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Created at' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor, 
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }
        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: url })
}