FROM node:10

CMD docker run -ti node:10 bash
RUN git clone https://github.com/elafosse/CDP_Release

WORKDIR ./CDP_Release/cdp-gr1-eq7/
RUN npm install

EXPOSE 3000
CMD node ./backend/initApp.js
