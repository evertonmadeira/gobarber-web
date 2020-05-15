import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import logo from '../assets/logo.svg';
import getValidationErrors from '../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório'),
        senha: Yup.string().min(6, 'Senha com no mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <>
      <Container>
        <Background />

        <Content>
          <img src={logo} alt="logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="nome" icon={FiUser} placeholder="Usuário" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="senha"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>
          </Form>

          <a href="signon">
            <FiArrowLeft />
            Criar conta
          </a>
        </Content>
      </Container>
    </>
  );
};
export default SignUp;
