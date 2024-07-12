# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o diretório de trabalho
COPY . .

# Exponha a porta que o backend está escutando
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "start"]
