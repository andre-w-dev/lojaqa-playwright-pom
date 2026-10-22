import { test, expect } from '../fixtures/auth.fixture';

const cenarios = [
  {
    descricao: 'Cliente válido',
    email: 'cliente.valido@lojaqa.com',
    senha: 'SenhaSegura123',
    sucesso: true,
  },
  {
    descricao: 'Email inválido',
    email: 'email-errado',
    senha: '123456789',
    sucesso: false,
  },
];

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