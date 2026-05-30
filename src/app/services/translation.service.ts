import { Injectable, signal, computed } from '@angular/core';

export type Language = 'pt-BR' | 'en-US';

interface Translations {
  [key: string]: {
    'pt-BR': string;
    'en-US': string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Signal para o idioma atual
  private currentLanguage = signal<Language>('pt-BR');

  // Computed para obter o idioma atual
  currentLang = computed(() => this.currentLanguage());

  // Traduções do site
  private translations: Translations = {
    // Header
    'nav.home': { 'pt-BR': 'Início', 'en-US': 'Home' },
    'nav.about': { 'pt-BR': 'Sobre', 'en-US': 'About' },
    'nav.schedule': { 'pt-BR': 'Horários', 'en-US': 'Schedule' },
    'nav.ministries': { 'pt-BR': 'Ministérios', 'en-US': 'Ministries' },
    'nav.events': { 'pt-BR': 'Eventos', 'en-US': 'Events' },
    'nav.cells': { 'pt-BR': 'Células', 'en-US': 'Small Groups' },
    'nav.contact': { 'pt-BR': 'Contato', 'en-US': 'Contact' },
    'nav.more': { 'pt-BR': 'Mais', 'en-US': 'More' },

    // Hero
    'hero.title': { 'pt-BR': 'Bem-vindo à', 'en-US': 'Welcome to' },
    'hero.subtitle': { 'pt-BR': 'Vivemos sob a luz da palavra.', 'en-US': 'We live by the light of the Word.' },
    'hero.yearTheme': { 'pt-BR': '2026: O ano da Consolidação ❤️', 'en-US': '2026: The Year of Consolidation ❤️' },
    'hero.button.visit': { 'pt-BR': 'Venha nos Visitar', 'en-US': 'Come Visit Us' },
    'hero.button.learnMore': { 'pt-BR': 'Saiba Mais', 'en-US': 'Learn More' },

    // About
    'about.title': { 'pt-BR': 'Sobre a Igreja', 'en-US': 'About the Church' },
    'about.subtitle': { 'pt-BR': 'Conheça nossa missão, visão e valores', 'en-US': 'Learn about our mission, vision and values' },
    'about.mission.title': { 'pt-BR': 'Nossa Missão', 'en-US': 'Our Mission' },
    'about.mission.text': { 'pt-BR': 'Proclamar o evangelho de Jesus Cristo, discipular pessoas e servir nossa comunidade com amor e compaixão, sendo luz em um mundo que precisa de esperança.', 'en-US': 'To proclaim the gospel of Jesus Christ, disciple people and serve our community with love and compassion, being light in a world that needs hope.' },
    'about.vision.title': { 'pt-BR': 'Nossa Visão', 'en-US': 'Our Vision' },
    'about.vision.text': { 'pt-BR': 'Ser uma igreja relevante e transformadora, onde cada pessoa encontre propósito, relacionamentos autênticos e crescimento espiritual, impactando positivamente nossa cidade e além.', 'en-US': 'To be a relevant and transformative church, where each person finds purpose, authentic relationships and spiritual growth, positively impacting our city and beyond.' },
    'about.values.title': { 'pt-BR': 'Nossos Valores', 'en-US': 'Our Values' },
    'about.value.love': { 'pt-BR': 'Amamos a Deus acima de tudo e ao próximo como a nós mesmos, demonstrando compaixão e cuidado genuíno.', 'en-US': 'We love God above all and our neighbor as ourselves, demonstrating genuine compassion and care.' },
    'about.value.fellowship': { 'pt-BR': 'Valorizamos relacionamentos autênticos e o cuidado mútuo, criando uma comunidade acolhedora e inclusiva.', 'en-US': 'We value authentic relationships and mutual care, creating a welcoming and inclusive community.' },
    'about.value.word': { 'pt-BR': 'Acreditamos na autoridade e relevância da Bíblia como guia para nossa vida e fé.', 'en-US': 'We believe in the authority and relevance of the Bible as a guide for our life and faith.' },
    'about.value.prayer': { 'pt-BR': 'Priorizamos a oração como meio de comunhão com Deus e busca por Sua direção em todas as áreas.', 'en-US': 'We prioritize prayer as a means of communion with God and seeking His direction in all areas.' },
    'about.value.mission': { 'pt-BR': 'Somos chamados a compartilhar o evangelho e fazer discípulos, tanto localmente quanto globalmente.', 'en-US': 'We are called to share the gospel and make disciples, both locally and globally.' },
    'about.value.excellence': { 'pt-BR': 'Buscamos fazer tudo com excelência para honrar a Deus e servir melhor nossa comunidade.', 'en-US': 'We seek to do everything with excellence to honor God and better serve our community.' },

    // Schedule
    'schedule.title': { 'pt-BR': 'Horários de Culto', 'en-US': 'Worship Schedule' },
    'schedule.subtitle': { 'pt-BR': 'Venha adorar conosco e experimentar a presença de Deus', 'en-US': 'Come worship with us and experience God\'s presence' },
    'schedule.note': { 'pt-BR': 'Importante: Todos são bem-vindos! Venha como está e experimente o amor e acolhimento da nossa comunidade.', 'en-US': 'Important: Everyone is welcome! Come as you are and experience the love and welcome of our community.' },
    'schedule.wednesday': { 'pt-BR': 'Quarta-feira', 'en-US': 'Wednesday' },
    'schedule.wednesday.title': { 'pt-BR': 'Culto da Família de Deus', 'en-US': 'God\'s Family Service' },
    'schedule.wednesday.desc': { 'pt-BR': 'Momento de adoração e edificação', 'en-US': 'A time of worship and edification' },
    'schedule.saturday': { 'pt-BR': 'Sábado', 'en-US': 'Saturday' },
    'schedule.saturday.prayer.title': { 'pt-BR': 'Sala de Oração', 'en-US': 'Prayer Room' },
    'schedule.saturday.prayer.desc': { 'pt-BR': 'Momento de intercessão e busca pela presença de Deus', 'en-US': 'A time of intercession and seeking God\'s presence' },
    'schedule.saturday.title': { 'pt-BR': 'Culto de Jovens', 'en-US': 'Youth Service' },
    'schedule.saturday.desc': { 'pt-BR': 'Culto de adoração e pregação da Palavra', 'en-US': 'Worship service and Word preaching' },
    'schedule.sunday': { 'pt-BR': 'Domingo', 'en-US': 'Sunday' },
    'schedule.sunday.morning.title': { 'pt-BR': 'Culto Celebração Manhã', 'en-US': 'Morning Celebration Service' },
    'schedule.sunday.morning.desc': { 'pt-BR': 'Culto de adoração e pregação da Palavra', 'en-US': 'Worship service and Word preaching' },
    'schedule.sunday.evening.title': { 'pt-BR': 'Culto Celebração Noite', 'en-US': 'Evening Celebration Service' },
    'schedule.sunday.evening.desc': { 'pt-BR': 'Momento de comunhão e edificação', 'en-US': 'A time of fellowship and edification' },

    // Ministries
    'ministries.title': { 'pt-BR': 'Nossos Ministérios', 'en-US': 'Our Ministries' },
    'ministries.subtitle': { 'pt-BR': 'Descubra como você pode se envolver e servir', 'en-US': 'Discover how you can get involved and serve' },
    'ministries.cta.text': { 'pt-BR': 'Interessado em participar de algum ministério?', 'en-US': 'Interested in joining a ministry?' },
    'ministries.cta.button': { 'pt-BR': 'Entre em Contato', 'en-US': 'Contact Us' },
    'ministries.family.title': { 'pt-BR': 'Família', 'en-US': 'Family' },
    'ministries.family.desc': { 'pt-BR': 'Ministério dedicado ao fortalecimento das famílias através de estudos bíblicos, encontros e aconselhamento.', 'en-US': 'Ministry dedicated to strengthening families through Bible studies, meetings and counseling.' },
    'ministries.youth.title': { 'pt-BR': 'Jovens', 'en-US': 'Youth' },
    'ministries.youth.desc': { 'pt-BR': 'Um espaço para jovens se conectarem, crescerem na fé e impactarem sua geração com o evangelho.', 'en-US': 'A space for young people to connect, grow in faith and impact their generation with the gospel.' },
    'ministries.children.title': { 'pt-BR': 'Crianças', 'en-US': 'Children' },
    'ministries.children.desc': { 'pt-BR': 'Ensino bíblico criativo e divertido para crianças, plantando sementes de fé desde cedo.', 'en-US': 'Creative and fun biblical teaching for children, planting seeds of faith from an early age.' },
    'ministries.worship.title': { 'pt-BR': 'Louvor', 'en-US': 'Worship' },
    'ministries.worship.desc': { 'pt-BR': 'Ministério de música e adoração, usando os dons para glorificar a Deus e edificar a igreja.', 'en-US': 'Music and worship ministry, using gifts to glorify God and edify the church.' },
    'ministries.teaching.title': { 'pt-BR': 'Ensino', 'en-US': 'Teaching' },
    'ministries.teaching.desc': { 'pt-BR': 'Escola Bíblica Dominical e estudos bíblicos para crescimento espiritual e conhecimento da Palavra.', 'en-US': 'Sunday School and Bible studies for spiritual growth and knowledge of the Word.' },
    'ministries.social.title': { 'pt-BR': 'Ação Social', 'en-US': 'Social Action' },
    'ministries.social.desc': { 'pt-BR': 'Servindo nossa comunidade através de projetos sociais, doações e ações de amor ao próximo.', 'en-US': 'Serving our community through social projects, donations and acts of love for others.' },
    'ministries.intercession.title': { 'pt-BR': 'Intercessão', 'en-US': 'Intercession' },
    'ministries.intercession.desc': { 'pt-BR': 'Grupo de oração dedicado a interceder pela igreja, comunidade e necessidades específicas.', 'en-US': 'Prayer group dedicated to interceding for the church, community and specific needs.' },
    'ministries.missions.title': { 'pt-BR': 'Missões', 'en-US': 'Missions' },
    'ministries.missions.desc': { 'pt-BR': 'Apoio e envio de missionários para compartilhar o evangelho localmente e internacionalmente.', 'en-US': 'Support and sending of missionaries to share the gospel locally and internationally.' },

    // Cells (Células / Small Groups)
    'cells.title': { 'pt-BR': 'Nossas Células', 'en-US': 'Our Small Groups' },
    'cells.subtitle': { 'pt-BR': 'Encontros semanais para crescer na fé, comunhão e relacionamentos', 'en-US': 'Weekly gatherings to grow in faith, fellowship and relationships' },
    'cells.day.label': { 'pt-BR': 'Dia', 'en-US': 'Day' },
    'cells.time.label': { 'pt-BR': 'Horário', 'en-US': 'Time' },
    'cells.day.thursday': { 'pt-BR': 'Quinta-feira', 'en-US': 'Thursday' },
    'cells.day.saturday': { 'pt-BR': 'Sábado', 'en-US': 'Saturday' },
    'cells.networking.name': { 'pt-BR': 'Célula Networking', 'en-US': 'Networking Small Group' },
    'cells.networking.desc': { 'pt-BR': 'Encontro voltado para profissionais conectarem fé, vida e trabalho.', 'en-US': 'A gathering for professionals to connect faith, life and work.' },
    'cells.youth.name': { 'pt-BR': 'Juventude Luz - Célula dos Jovens', 'en-US': 'Luz Youth - Youth Small Group' },
    'cells.youth.desc': { 'pt-BR': 'Comunhão e discipulado para jovens crescerem juntos na fé.', 'en-US': 'Fellowship and discipleship for young people to grow together in faith.' },
    'cells.teens.name': { 'pt-BR': 'Célula de Adolescentes', 'en-US': 'Teens Small Group' },
    'cells.teens.desc': { 'pt-BR': 'Espaço para adolescentes vivenciarem a Palavra e construírem amizades verdadeiras.', 'en-US': 'A space for teenagers to live out the Word and build true friendships.' },
    'cells.address.label': { 'pt-BR': 'Endereço de todas as células', 'en-US': 'Address for all small groups' },
    'cells.address.value': { 'pt-BR': 'Rua Monsenhor João Rodrigues, 217 - Industrial', 'en-US': 'Rua Monsenhor João Rodrigues, 217 - Industrial' },
    'cells.map.button': { 'pt-BR': 'Ver no Google Maps', 'en-US': 'View on Google Maps' },

    // Events
    'events.title': { 'pt-BR': 'Próximos Eventos', 'en-US': 'Upcoming Events' },
    'events.subtitle': { 'pt-BR': 'Fique por dentro dos eventos e atividades da nossa igreja', 'en-US': 'Stay updated on our church events and activities' },
    'events.cta.text': { 'pt-BR': 'Quer receber notificações sobre nossos eventos?', 'en-US': 'Want to receive notifications about our events?' },
    'events.cta.button': { 'pt-BR': 'Entre em Contato', 'en-US': 'Contact Us' },
    'events.location': { 'pt-BR': 'Local', 'en-US': 'Location' },
    'events.time': { 'pt-BR': 'Horário', 'en-US': 'Time' },

    // Instagram Feed
    'instagram.title': { 'pt-BR': 'Siga-nos no Instagram', 'en-US': 'Follow Us on Instagram' },
    'instagram.subtitle': { 'pt-BR': 'Fique por dentro do nosso dia a dia e eventos', 'en-US': 'Stay updated on our daily life and events' },
    'instagram.button': { 'pt-BR': 'Ver mais no Instagram', 'en-US': 'See More on Instagram' },

    // Contact
    'contact.title': { 'pt-BR': 'Entre em Contato', 'en-US': 'Contact Us' },
    'contact.subtitle': { 'pt-BR': 'Estamos aqui para você. Venha nos visitar ou entre em contato', 'en-US': 'We are here for you. Come visit us or get in touch' },
    'contact.address': { 'pt-BR': 'Endereço', 'en-US': 'Address' },
    'contact.phone': { 'pt-BR': 'Telefone', 'en-US': 'Phone' },
    'contact.email': { 'pt-BR': 'E-mail', 'en-US': 'Email' },
    'contact.whatsapp': { 'pt-BR': 'WhatsApp', 'en-US': 'WhatsApp' },
    'contact.form.title': { 'pt-BR': 'Envie uma Mensagem', 'en-US': 'Send a Message' },
    'contact.form.name': { 'pt-BR': 'Nome', 'en-US': 'Name' },
    'contact.form.email': { 'pt-BR': 'E-mail', 'en-US': 'Email' },
    'contact.form.phone': { 'pt-BR': 'Telefone', 'en-US': 'Phone' },
    'contact.form.message': { 'pt-BR': 'Mensagem', 'en-US': 'Message' },
    'contact.form.submit': { 'pt-BR': 'Enviar Mensagem', 'en-US': 'Send Message' },
    'contact.map.title': { 'pt-BR': 'Nossa Localização', 'en-US': 'Our Location' },
    'contact.map.link': { 'pt-BR': 'Abrir no Google Maps', 'en-US': 'Open in Google Maps' },

    // Footer
    'footer.quickLinks': { 'pt-BR': 'Links Rápidos', 'en-US': 'Quick Links' },
    'footer.follow': { 'pt-BR': 'Siga-nos', 'en-US': 'Follow Us' },
    'footer.copyright': { 'pt-BR': 'Todos os direitos reservados.', 'en-US': 'All rights reserved.' },
    'footer.madeWith': { 'pt-BR': 'Feito com ❤️ para glorificar a Deus', 'en-US': 'Made with ❤️ to glorify God' },

    // More Menu
    'more.devocionais': { 'pt-BR': 'Devocionais', 'en-US': 'Devotionals' },
    'more.devocionais.desc': { 'pt-BR': 'Reflexões diárias da Palavra', 'en-US': 'Daily reflections on the Word' },
    'more.podcasts': { 'pt-BR': 'Podcasts', 'en-US': 'Podcasts' },
    'more.podcasts.desc': { 'pt-BR': 'Mensagens e estudos em áudio', 'en-US': 'Audio messages and studies' },
    'more.planoLeitura': { 'pt-BR': 'Plano de Leitura', 'en-US': 'Reading Plan' },
    'more.planoLeitura.desc': { 'pt-BR': 'Leia a Bíblia em um ano', 'en-US': 'Read the Bible in one year' },
    'more.estudos': { 'pt-BR': 'Estudos Bíblicos', 'en-US': 'Bible Studies' },
    'more.estudos.desc': { 'pt-BR': 'Materiais de estudo', 'en-US': 'Study materials' },

    // Estudos Bíblicos (Árvore 2026)
    'estudos.plan.title': { 'pt-BR': 'Árvore de Estudos Bíblicos 2026', 'en-US': '2026 Bible Studies Tree' },
    'estudos.plan.subtitle': { 'pt-BR': 'Uma trilha mensal para crescer no conhecimento da Palavra ao longo do ano.', 'en-US': 'A monthly journey to grow in the knowledge of the Word throughout the year.' },
    'estudos.empty.message': { 'pt-BR': 'Estudos em breve', 'en-US': 'Studies coming soon' },
    'estudos.currentBadge': { 'pt-BR': 'Mês atual', 'en-US': 'Current month' },
    'estudos.actions.expandAll': { 'pt-BR': 'Expandir tudo', 'en-US': 'Expand all' },
    'estudos.actions.collapseAll': { 'pt-BR': 'Recolher tudo', 'en-US': 'Collapse all' },
    'estudos.actions.download': { 'pt-BR': 'Baixar estudo', 'en-US': 'Download study' },
    'estudos.studiesCount.one': { 'pt-BR': '{{count}} estudo', 'en-US': '{{count}} study' },
    'estudos.studiesCount.many': { 'pt-BR': '{{count}} estudos', 'en-US': '{{count}} studies' },

    'estudos.month.january':   { 'pt-BR': 'Janeiro',   'en-US': 'January' },
    'estudos.month.february':  { 'pt-BR': 'Fevereiro', 'en-US': 'February' },
    'estudos.month.march':     { 'pt-BR': 'Março',     'en-US': 'March' },
    'estudos.month.april':     { 'pt-BR': 'Abril',     'en-US': 'April' },
    'estudos.month.may':       { 'pt-BR': 'Maio',      'en-US': 'May' },
    'estudos.month.june':      { 'pt-BR': 'Junho',     'en-US': 'June' },
    'estudos.month.july':      { 'pt-BR': 'Julho',     'en-US': 'July' },
    'estudos.month.august':    { 'pt-BR': 'Agosto',    'en-US': 'August' },
    'estudos.month.september': { 'pt-BR': 'Setembro',  'en-US': 'September' },
    'estudos.month.october':   { 'pt-BR': 'Outubro',   'en-US': 'October' },
    'estudos.month.november':  { 'pt-BR': 'Novembro',  'en-US': 'November' },
    'estudos.month.december':  { 'pt-BR': 'Dezembro',  'en-US': 'December' },
    'estudos.month.bonus':     { 'pt-BR': 'Temas Livres', 'en-US': 'Bonus Topics' },
    'more.mensagens': { 'pt-BR': 'Mensagens', 'en-US': 'Messages' },
    'more.mensagens.desc': { 'pt-BR': 'Pregações e sermões', 'en-US': 'Preachings and sermons' },
    'more.recursos': { 'pt-BR': 'Recursos', 'en-US': 'Resources' },
    'more.recursos.desc': { 'pt-BR': 'Ferramentas e materiais', 'en-US': 'Tools and materials' }
  };

  /**
   * Define o idioma atual
   */
  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    // Salva no localStorage para persistir
    localStorage.setItem('language', lang);
  }

  /**
   * Inicializa o idioma do localStorage ou usa o padrão
   */
  initializeLanguage(): void {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'pt-BR' || savedLang === 'en-US')) {
      this.currentLanguage.set(savedLang);
    } else {
      // Detecta o idioma do navegador
      const browserLang = navigator.language || 'pt-BR';
      if (browserLang.startsWith('en')) {
        this.currentLanguage.set('en-US');
      } else {
        this.currentLanguage.set('pt-BR');
      }
    }
  }

  /**
   * Obtém a tradução de uma chave
   */
  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation[this.currentLanguage()] || translation['pt-BR'];
  }

  /**
   * Obtém a tradução como signal reativo
   */
  get(key: string) {
    return computed(() => this.translate(key));
  }
}

