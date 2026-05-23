import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(
    private sanitizer: DomSanitizer,
    public translationService: TranslationService
  ) {}

  // Traduções reativas
  sectionTitle = computed(() => this.translationService.translate('contact.title'));
  sectionSubtitle = computed(() => this.translationService.translate('contact.subtitle'));
  addressLabel = computed(() => this.translationService.translate('contact.address'));
  phoneLabel = computed(() => this.translationService.translate('contact.phone'));
  emailLabel = computed(() => this.translationService.translate('contact.email'));
  whatsappLabel = computed(() => this.translationService.translate('contact.whatsapp'));
  mapTitle = computed(() => this.translationService.translate('contact.map.title'));
  mapLink = computed(() => this.translationService.translate('contact.map.link'));
  // Signal para informações de contato
  contactInfo = signal({
    address: 'Rua Monsenhor João Rodrigues, 217',
    city: 'Industrial',
    phone: '(31) 98468-6838',
    email: 'contato@igrejabatistadaluz.com.br',
    whatsapp: '(31) 98468-6838'
  });

  // URL do Google Maps embed (sanitizada para segurança)
  getGoogleMapsUrl(): SafeResourceUrl {
    const fullAddress = `${this.contactInfo().address}, ${this.contactInfo().city}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    const url = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // URL do Google Maps para link externo
  getGoogleMapsSearchUrl(): string {
    const fullAddress = `${this.contactInfo().address}, ${this.contactInfo().city}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  /**
   * Gera a URL do WhatsApp removendo caracteres não numéricos
   */
  getWhatsAppUrl(): string {
    const phoneNumber = this.contactInfo().whatsapp.replace(/\D/g, '');
    return `https://wa.me/55${phoneNumber}`;
  }
}

