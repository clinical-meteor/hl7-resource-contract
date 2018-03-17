describe('clinical:hl7-resources-contract', function () {
  var server = meteor();
  var client = browser(server);

  it('Contracts should exist on the client', function () {
    return client.execute(function () {
      expect(Contracts).to.exist;
    });
  });

  it('Contracts should exist on the server', function () {
    return server.execute(function () {
      expect(Contracts).to.exist;
    });
  });

});
