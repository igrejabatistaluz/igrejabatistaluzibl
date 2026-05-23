import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-donation-float',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donation-float.component.html',
  styleUrl: './donation-float.component.scss'
})
export class DonationFloatComponent {
  isOpen = signal(false);

  constructor(public translationService: TranslationService) {}

  toggleModal(): void {
    this.isOpen.update(value => !value);
  }

  closeModal(): void {
    this.isOpen.set(false);
  }

  // Versículo sobre ofertas
  verse = {
    text: 'Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria.',
    reference: '2 Coríntios 9:7'
  };

  // Informações de doação
  donationInfo = {
    pix: [
      {
        key: '(31) 98468-8844',
        label: 'Chave PIX 1 (Telefone)',
        type: 'phone'
      },
      {
        key: '56.883.725/0001-20',
        label: 'Chave PIX 2 (CNPJ)',
        type: 'cnpj'
      }
    ],
    name: 'IGREJA BATISTA DA LUZ INDUSTRIAL',
    bank: {
      name: 'BANCO SICOOB',
      agency: '3140',
      account: '80.023-6',
      nameAccount: 'IGREJA BATISTA DA LUZ INDUSTRIAL'
    }
  };

  copyPix(pixKey: string): void {
    navigator.clipboard.writeText(pixKey).then(() => {
      alert('Chave PIX copiada para a área de transferência!');
    });
  }

  copyBankInfo(): void {
    const bankInfo = `Banco: ${this.donationInfo.bank.name}\nAgência: ${this.donationInfo.bank.agency}\nConta: ${this.donationInfo.bank.account}\nNome: ${this.donationInfo.name}`;
    navigator.clipboard.writeText(bankInfo).then(() => {
      alert('Informações bancárias copiadas para a área de transferência!');
    });
  }

  copyField(value: string, label: string): void {
    navigator.clipboard.writeText(value).then(() => {
      alert(`${label} copiado para a área de transferência!`);
    });
  }
}

