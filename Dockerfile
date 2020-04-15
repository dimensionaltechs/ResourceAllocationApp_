FROM node:10.15.3-alpine
COPY . .
CMD $ResourceAllocation_
RUN npm install
EXPOSE 8100