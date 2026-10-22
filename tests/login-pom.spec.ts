import { randomUUID } from 'node:crypto';
import { test, expect } from '../fixtures/auth.fixture';

test.describe('Ato 1: Validar carregamento e visibilidade de elementos', () => {
  test('validar titulo e carregamento da pagina', async ({ page, loginPage }) => {
    await loginPage.goto();
    await expect(page).toHaveTitle(/LojaQA | Entrar/i);
  });

  test('verificar exibicao dos campos do form de login', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeDisabled();
  });
});

test.describe('Ato 2: Caminho feliz', () => {
  test('validar acesso e redicionar ao painel', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.emailInput.fill('andredev123@gmail.com');
    await loginPage.passwordInput.fill('123456789');
    await expect(loginPage.loginButton).toBeEnabled();
    await loginPage.loginButton.click();
    await expect(page).toHaveURL(/painel\.html/);
  });

  test('verificar botão de login desativado quando o campo de email está incorreto', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.emailInput.fill('email-invalido');
    await loginPage.passwordInput.fill('123456789');
    await expect(loginPage.loginButton).toBeDisabled();
  });
});

test.describe('Ato 3: Caminho triste e cadastros', () => {
  test('verificar mensagem de erro quando o campo de email está incorreto', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('emailinvalido@gmail.com', '123456789');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Erro: usuário não encontrado. Tentativa 1 de 3.');
  });

  test('criar usuario de cliente e validar o formulario de cadastro e o login', async ({ page, loginPage }) => {
    const email = `cliente-${randomUUID()}@gmail.com`;
    await loginPage.goto();
    await loginPage.cadastrarCliente('Cliente Teste', email, '123456789');
    await loginPage.login(email, '123456789');
    await expect(page).toHaveURL(/painel\.html/);
  });

  test('criar usuario de lojista e validar o formulario de cadastro e o login', async ({ page, loginPage }) => {
    const email = `lojista-${randomUUID()}@gmail.com`;
    await loginPage.goto();
    await loginPage.cadastrarLojista('Lojista Teste', email, '123456789', 'Loja Teste');
    await loginPage.login(email, '123456789');
    await expect(page).toHaveURL(/painel\.html/);
  });
});