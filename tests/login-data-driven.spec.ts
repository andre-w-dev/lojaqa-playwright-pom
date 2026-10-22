import { test, expect } from '../fixtures/auth.fixture';

const cenarios = [
  {
    descricao: 'Cliente válido',
    email: 'user@system.com',
    senha: 'UserPassword123',
    sucesso: true,
  },
  {
    descricao: 'Email não cadastrado',
    email: 'nao-cadastrado@lojaqa.com',
    senha: '123456789',
    sucesso: false,
  },
];
//t
test.describe('LojaQA - Testes Data-Driven', () => {
  for (const cenario of cenarios) {
    test(`Cenário: ${cenario.descricao}`, async ({ page, loginPage }) => {
      await loginPage.goto();
      await loginPage.login(cenario.email, cenario.senha);

      if (cenario.sucesso) {
        await expect(page).toHaveURL(/painel\.html/);
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
      }
    });
  }
});