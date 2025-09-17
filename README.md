# CatecSeguros - Site Fintech com Segurança Cibernética

## 🔒 Visão Geral

CatecSeguros é um site fintech especializado em seguros cibernéticos e soluções de segurança digital. O projeto foi desenvolvido com foco máximo em segurança cibernética, implementando as melhores práticas de proteção digital. O design foi inspirado na estética profissional da Minuto Seguros, garantindo credibilidade e confiança.

## 🎨 Design e Estética

### **Inspiração Visual**
- Design baseado na estética da Minuto Seguros
- Header verde no topo com informações de contato
- Logo duplo (CCS CatecSeguros | C Creditas)
- Layout duas colunas no hero section
- Cores verde vibrante (#8BC34A) como principal
- Design limpo e profissional

### **Características Visuais**
- Botão verde arredondado para CTAs
- Cards com bordas verdes no topo
- Gradientes verdes nos elementos principais
- Tipografia profissional e legível
- Layout responsivo completo

## 📁 Estrutura do Projeto

```
CatecSeguros/
├── index.html              # Página principal com novo design
├── styles.css              # Estilos inspirados na Minuto Seguros
├── app.js                  # Lógica principal da aplicação
├── security.js             # Módulo de segurança cibernética
├── security-config.json    # Configurações de segurança
├── production-config.json  # Configurações de produção
├── catec..htaccess         # Configurações Apache
├── robots.txt              # Diretrizes para crawlers
├── sitemap.xml             # Mapa do site para SEO
└── README.md               # Documentação do projeto
```

## 🚀 Como Executar

### 1. **Servidor Local (Desenvolvimento)**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

### 2. **Servidor HTTPS (Produção)**
```bash
# Com certificado SSL
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
python -m http.server 8000 --bind 0.0.0.0
```

## 🔧 Configurações de Segurança

### **Content Security Policy (CSP)**
O CSP está configurado para permitir apenas recursos do mesmo domínio, bloqueando scripts externos maliciosos.

### **Validação de Entrada**
Todos os inputs são validados e sanitizados:
- Remoção de tags HTML
- Filtragem de caracteres perigosos
- Validação de formato (email, telefone)
- Limitação de tamanho

### **Criptografia de Dados**
```javascript
// Exemplo de uso da criptografia
const encryptedData = securityManager.encryptData(sensitiveData);
const decryptedData = securityManager.decryptData(encryptedData);
```

## 📊 Monitoramento de Segurança

### **Eventos Monitorados**
- Tentativas de acesso ao DevTools
- Cliques em links JavaScript
- Injeções de scripts inline
- Mudanças suspeitas no DOM
- Tentativas de impressão

### **Alertas Automáticos**
O sistema gera alertas para:
- Atividades suspeitas detectadas
- Tentativas de phishing
- Violações de CSP
- Falhas de validação

## 🌐 Recursos do Site

### **Seções Principais**
1. **Hero Section** - Apresentação da empresa com logo CCS
2. **Segurança** - Recursos de proteção cibernética
3. **Serviços** - Seguros e consultoria
4. **Sobre** - Informações da empresa
5. **Contato** - Formulários seguros e informações de contato

### **Serviços Oferecidos**
- **Seguro Cibernético Empresarial** (até R$ 10 milhões)
- **Proteção Digital Pessoal**
- **Consultoria em Segurança**

### **Certificações**
- ISO 27001
- SOC 2
- GDPR Compliance
- LGPD Compliance

### **Localização**
- **Sede:** Londrina, Paraná
- **Endereço:** Av. Ayrton Senna da Silva, 500 - Sala 901 - Palhano 2
- **CEP:** 86050-460

## 📍 Informações de Contato

**Endereço:**
- Av. Ayrton Senna da Silva, 500 - Sala 901 - Palhano 2
- Londrina - PR, 86050-460

**Contato Principal:**
- Telefone: (43) 3344-4220
- E-mail: contato@catecseguros.com.br

**Horário de Funcionamento:**
- Segunda a Sexta: 08:00 às 12:00 | 13:30 às 18:00
- Sábado: 08:00 às 12:00
- Domingo: Fechado

**Redes Sociais:**
- Instagram: [@catecseguros](https://instagram.com/catecseguros)
- Facebook: [CatecSeguros](https://www.facebook.com/catecseguros)

**Emergência 24/7:**
- Telefone: (43) 9111-4220
- E-mail: emergencia@catecseguros.com.br

## 🔐 Políticas de Segurança

### **Política de Senhas**
- Mínimo 12 caracteres
- Combinação de maiúsculas, minúsculas, números e símbolos
- Não reutilização de senhas
- Rotação obrigatória a cada 90 dias

### **Política de Acesso**
- Autenticação multi-fator obrigatória
- Acesso baseado em função
- Logs de acesso detalhados
- Revogação imediata em caso de suspeita

## 🚨 Resposta a Incidentes

### **Procedimento de Emergência**
1. **Detecção** - Sistema automático de monitoramento
2. **Contenção** - Isolamento imediato da ameaça
3. **Investigação** - Análise forense do incidente
4. **Recuperação** - Restauração dos serviços
5. **Lições Aprendidas** - Melhoria contínua

## 📈 Métricas de Segurança

- **Uptime**: 99.9%
- **Tempo de Resposta**: < 5 minutos
- **Empresas Protegidas**: 500+
- **Monitoramento**: 24/7

## 🔄 Atualizações de Segurança

O sistema é atualizado regularmente com:
- Patches de segurança
- Novas funcionalidades de proteção
- Melhorias na detecção de ameaças
- Otimizações de performance

## 📋 Compliance

### **Regulamentações Atendidas**
- **LGPD** (Lei Geral de Proteção de Dados)
- **GDPR** (General Data Protection Regulation)
- **ISO 27001** (Gestão de Segurança da Informação)
- **SOC 2** (Controles de Segurança)

## 🤝 Contribuição

Para contribuir com melhorias de segurança:
1. Reporte vulnerabilidades via e-mail seguro
2. Use criptografia PGP para comunicações sensíveis
3. Siga as diretrizes de segurança do projeto
4. Teste todas as alterações em ambiente isolado

## 📄 Licença

Este projeto está protegido por direitos autorais. Todos os direitos reservados à CatecSeguros.

---

**⚠️ AVISO IMPORTANTE**: Este é um sistema de produção com foco em segurança. Qualquer tentativa de acesso não autorizado será monitorada e reportada às autoridades competentes.

**🔒 Última atualização de segurança**: Dezembro 2024
