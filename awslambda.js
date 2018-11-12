exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: '[{"id":0,"status":"unknown","position":{"lat":37.778529,"lng":-122.40564}},{"id":1,"status":"battery_dead","position":{"lat":37.779529,"lng":-122.40564}},{"id":2,"status":"battery_dead","position":{"lat":37.775529,"lng":-122.40564}},{"id":3,"status":"out_of_range","position":{"lat":37.774529,"lng":-122.40264}},{"id":4,"status":"unknown","position":{"lat":37.777529,"lng":-122.40504}}]',
    };
    return response;
};
