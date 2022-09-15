import http from 'http'

const { PORT = 3000 } = process.env

const listenFn = (request, response) => {
    console.log(`request ${request.url}`);

    let data = '';
    request.on('data', chunk => {
      data += chunk;
    });
    request.on('end', () => {
      if (request.headers?.['content-type'] === 'application/json') {
        data = JSON.parse(data)
      }

    console.dir({
        t: 'DATA',
        data: data
    }, { depth: 20, colors: true })

    console.dir({
        t: 'HEADERS',
        headers: request.headers
    }, { depth: 20, colors: true })
      
    response.writeHead(204);
    response.end();
    });
}

http.createServer(listenFn).listen(PORT);
console.log(`Listening: ${PORT} port`)