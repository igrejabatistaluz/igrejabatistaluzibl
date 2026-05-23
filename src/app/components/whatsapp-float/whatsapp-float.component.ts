import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-float.component.html',
  styleUrl: './whatsapp-float.component.scss'
})
export class WhatsAppFloatComponent {
  // Signal para informações do WhatsApp
  whatsappInfo = signal({
    phone: '(31) 98468-6838',
    message: 'Olá! Gostaria de saber mais sobre a Igreja Batista da Luz.'
  });

  /**
   * Gera a URL do WhatsApp com mensagem pré-definida
   */
  getWhatsAppUrl(): string {
    const phoneNumber = this.whatsappInfo().phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(this.whatsappInfo().message);
    return `https://wa.me/55${phoneNumber}?text=${encodedMessage}`;
  }
}

