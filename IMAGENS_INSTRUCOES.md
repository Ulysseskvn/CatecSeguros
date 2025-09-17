# 📸 Instruções para Adicionar Imagens do Cliente

## 📁 Estrutura de Pastas

Crie a seguinte estrutura de pastas na raiz do projeto:

```
CatecSeguros/
├── images/
│   ├── cliente-1.jpg          # Imagem da equipe
│   ├── produtos-1.jpg         # Imagem dos produtos
│   ├── produtos-2.jpg         # Imagem adicional dos produtos
│   ├── equipe-1.jpg           # Imagem da equipe para galeria
│   ├── escritorio-1.jpg       # Imagem do escritório
│   ├── atendimento-1.jpg      # Imagem do atendimento
│   ├── certificacoes-1.jpg    # Imagem das certificações
│   └── eventos-1.jpg          # Imagem de eventos
├── index.html
├── styles.css
├── app.js
└── outros arquivos...
```

## 🎯 Imagens Necessárias

### **Carrossel (Hero Section)**
- **`cliente-1.jpg`** - Imagem da equipe (slide 5)
- **`produtos-1.jpg`** - Imagem dos produtos (slide 6)

### **Galeria**
- **`equipe-1.jpg`** - Equipe CatecSeguros
- **`escritorio-1.jpg`** - Escritório CatecSeguros
- **`produtos-2.jpg`** - Produtos CatecSeguros
- **`atendimento-1.jpg`** - Atendimento personalizado
- **`certificacoes-1.jpg`** - Certificações e reconhecimentos
- **`eventos-1.jpg`** - Participação em eventos

## 📐 Especificações Técnicas

### **Dimensões Recomendadas:**
- **Carrossel**: 300x200px (proporção 3:2)
- **Galeria**: 400x300px (proporção 4:3)
- **Formato**: JPG ou PNG
- **Qualidade**: Alta resolução (72-150 DPI)
- **Tamanho**: Máximo 500KB por imagem

### **Otimização:**
- Comprima as imagens antes de usar
- Use ferramentas como TinyPNG ou ImageOptim
- Mantenha boa qualidade visual

## 🔧 Como Adicionar as Imagens

### **1. Criar a Pasta**
```bash
mkdir images
```

### **2. Adicionar as Imagens**
- Copie as imagens do PDF ou de outras fontes
- Renomeie conforme a lista acima
- Coloque na pasta `images/`

### **3. Verificar os Caminhos**
Os caminhos já estão configurados no HTML:
```html
<img src="images/cliente-1.jpg" alt="CatecSeguros - Nossa Equipe">
<img src="images/produtos-1.jpg" alt="CatecSeguros - Nossos Produtos">
```

## 🎨 Personalização

### **Alterar Imagens do Carrossel:**
1. Abra `index.html`
2. Encontre as linhas com `src="images/..."`
3. Substitua pelos nomes das suas imagens

### **Alterar Imagens da Galeria:**
1. Abra `index.html`
2. Encontre a seção `#gallery`
3. Substitua os `src` das imagens

### **Adicionar Mais Slides:**
1. Adicione novo slide no HTML
2. Atualize `totalSlides` no `app.js`
3. Adicione novo indicador

## 🚀 Funcionalidades Implementadas

### **Carrossel com Imagens:**
- ✅ 6 slides (4 de texto + 2 com imagens)
- ✅ Transições suaves
- ✅ Auto-play a cada 5 segundos
- ✅ Navegação manual
- ✅ Indicadores visuais
- ✅ Responsivo

### **Galeria de Imagens:**
- ✅ 6 imagens em grid responsivo
- ✅ Overlay com informações
- ✅ Efeitos hover
- ✅ Animações suaves
- ✅ Design moderno

## 📱 Responsividade

- **Desktop**: Grid 3 colunas
- **Tablet**: Grid 2 colunas  
- **Mobile**: Grid 1 coluna
- **Imagens**: Redimensionamento automático

## 🔍 Troubleshooting

### **Imagem não aparece:**
1. Verifique se o arquivo existe na pasta `images/`
2. Confirme o nome do arquivo (case-sensitive)
3. Verifique a extensão (.jpg, .png, etc.)

### **Imagem muito grande:**
1. Redimensione a imagem
2. Comprima o arquivo
3. Use ferramentas de otimização

### **Carrossel não funciona:**
1. Verifique se `app.js` está carregado
2. Confirme se `totalSlides = 6`
3. Verifique o console do navegador

## 📞 Suporte

Se precisar de ajuda:
- Verifique o console do navegador (F12)
- Confirme se todas as imagens estão na pasta correta
- Teste em diferentes navegadores

---

**🎉 Pronto!** Agora é só adicionar as imagens na pasta `images/` e o site estará completo com as fotos do cliente!
