const randomString = require("randomstring");
const getRandomInt = require('./getRandomInt');

const propertiesTypes = ['yes/no', 'string', 'number', 'svg', 'table'];

function generateRandomProperties({maxCountProperties = 10}) {
    const countProperties = getRandomInt(1, maxCountProperties);
    const properties = {};
    for (let i = 0; i <= countProperties; i++) {
        const propertyName = 'property' + i;
        let propertyValue;
        switch (propertiesTypes[getRandomInt(0, propertiesTypes.length)]) {
            case 'yes/no':
                propertyValue = Math.random() < 0.5;
                break;
            case 'string':
                propertyValue = randomString.generate(10);
                break;
            case 'number':
                propertyValue = Math.floor(Math.random() * 100);
                break;
            case 'svg':
                propertyValue = 'http://' + randomString.generate(5) + '.svg';
                break;
            case 'table':
                propertyValue = [
                    [randomString.generate(5), randomString.generate(5)],
                    ['Data1', 'Data2']
                ]
                break;
        }
        properties[propertyName] = propertyValue;
    }
    return properties;
}

module.exports = generateRandomProperties;