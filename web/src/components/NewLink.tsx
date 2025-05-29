import { Field, Input, Button, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Warning } from 'phosphor-react';
import { createNewLink } from '../http/services/createNewLink';
import { toaster } from "./ui/toaster";
import { useLinksStore } from '../store/linksStore';

import styles from './NewLink.module.css';
import validator from 'validator';

export function NewLink() {
    const { addLink } = useLinksStore();
    const [formData, setFormData] = useState({
        originalLink: '',
        shortenedLink: '',
    });
    const [errors, setErrors] = useState({
        originalLink: '',
        shortenedLink: '',
    });
    const [hasFullFilledRequiredFields, setHasFullFilledRequiredFields] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const prefix = 'brev.ly/';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;

        if(name == "shortenedLink") {
            value = value.slice(prefix.length);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateFormInputs = () => {
        let isValid = true;
        const newErrors = { originalLink: '', shortenedLink: '' };
        
        if (!validator.isURL(formData.originalLink, { require_protocol: false })) {
            newErrors.originalLink = 'Por favor, insira uma URL válida (ex.: www.exemplo.com).';
            isValid = false;
        }
        
        const shortenedLinkRegex = /^[a-z0-9-]+$/;

        if (!shortenedLinkRegex.test(formData.shortenedLink)) {
            newErrors.shortenedLink = 'O link encurtado não deve conter letras maiúsculas, nem espaços em branco e nem caracteres especiais.';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };
    
    const handleSubmitNewLink = async () => {
        if (validateFormInputs()) {
            setIsLoading(true);

            try {
                const newLink = await createNewLink(
                    /^https?:\/\//i.test(formData.originalLink) ? formData.originalLink : `https://${formData.originalLink}`, 
                    formData.shortenedLink
                );
                
                toaster.success({
                    title: "Link criado com sucesso!",
                    type: "success"
                });

                addLink(newLink)
            } catch(error: any) {
                toaster.error({
                    title: error.message,
                    type: "error"
                })
            }

            setIsLoading(false);
        } 
    };
    
    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== '');
        setHasFullFilledRequiredFields(allFieldsFilled);
    }, [formData]);

    return (
        <main className={styles.container}>
            <header>
                <h1>Novo link</h1>
            </header>
            <VStack gap={4} align="stretch">
                <Field.Root invalid>
                    <Field.Label className={styles.label}>
                        Link Original
                    </Field.Label>
                    <Input
                        className={`${styles.input} ${
                            formData.originalLink ? styles.filled : ''
                        }`}
                        name="originalLink"
                        placeholder="www.exemplo.com.br"
                        value={formData.originalLink}
                        onChange={handleInputChange}
                    />
                    {errors.originalLink && (
                        <Field.ErrorText className={styles.errorText}>
                            <Warning /> {errors.originalLink}
                        </Field.ErrorText>
                    )}
                </Field.Root>
                <Field.Root invalid>
                    <Field.Label className={styles.label}>
                        Link Encurtado
                    </Field.Label>
                    <Input
                        className={`${styles.input} ${
                            formData.shortenedLink ? styles.filled : ''
                        }`}
                        name="shortenedLink"
                        placeholder={prefix}
                        value={`${prefix}${formData.shortenedLink}`}
                        onChange={handleInputChange}
                    />
                    {errors.shortenedLink && (
                        <Field.ErrorText className={styles.errorText}>
                            <Warning /> {errors.shortenedLink}
                        </Field.ErrorText>
                    )}
                </Field.Root>
                <Button
                    className={styles.button}
                    onClick={handleSubmitNewLink}
                    disabled={!hasFullFilledRequiredFields}
                >
                    {isLoading ? 
                        "Salvando..."
                    :
                        "Salvar link"
                    }
                </Button>
            </VStack>
        </main>
    );
}