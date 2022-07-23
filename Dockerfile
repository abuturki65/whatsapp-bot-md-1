FROM quay.io/lyfe00011/md:beta
RUN git clone https://github.com/abuturki65/whatsapp-bot-md-1.git /root/LyFE/
WORKDIR /root/LyFE/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
