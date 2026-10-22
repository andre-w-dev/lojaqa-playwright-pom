import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly registerTabBtn: Locator;
  readonly regNameInput: Locator;
  readonly regEmailInput: Locator;
  readonly regPasswordInput: Locator;
  readonly regRoleSelect: Locator;
  readonly regStoreNameInput: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.errorMessage = page.locator('#errorMessage');
    this.registerTabBtn = page.locator('[onclick*="section-register"]');
    this.regNameInput = page.locator('#reg-name');
    this.regEmailInput = page.locator('#reg-email');
    this.regPasswordInput = page.locator('#reg-password');
    this.regRoleSelect = page.locator('#reg-role');
    this.regStoreNameInput = page.locator('#reg-store-name');
    this.registerBtn = page.locator('#registerBtn');
  }

  async goto() {
    await this.page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async cadastrarCliente(nome: string, email: string, pass: string) {
    await this.registerTabBtn.click();
    await this.regNameInput.fill(nome);
    await this.regEmailInput.fill(email);
    await this.regPasswordInput.fill(pass);
    await this.regRoleSelect.selectOption('Cliente');
    await this.registerBtn.click();
  }

  async cadastrarLojista(nome: string, email: string, pass: string, nomeLoja: string) {
    await this.registerTabBtn.click();
    await this.regNameInput.fill(nome);
    await this.regEmailInput.fill(email);
    await this.regPasswordInput.fill(pass);
    await this.regRoleSelect.selectOption('Lojista / vendedor');
    await this.regStoreNameInput.fill(nomeLoja);
    await this.registerBtn.click();
  }
}