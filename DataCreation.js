const randomString = require('randomString');
const fs = require('fs');
const generateRandomProperties = require('generateRandomProperties')
const getRandomInt = require('getRandomInt');

function generateTree({countNodes, maxCountChildAtNode = 3}) {
    const generateByLevelsRecursion = function foo(
        previousLevelNodes,
    ) {
        const currentLevelNodes = [];

        // Проверка на первую итерацию
        if (!previousLevelNodes) {
            currentLevelNodes.push({
                id: 1,
                properties: generateRandomProperties({}),
            });
            foo(currentLevelNodes);
        } else {
            for (const [index, node] of previousLevelNodes.entries()) {
                node.children = [];

                let lastChildId = index
                    ? currentLevelNodes.at(-1).id
                    : previousLevelNodes.at(-1).id

                const countChildren = lastChildId + maxCountChildAtNode <= countNodes
                    ? getRandomInt(1, maxCountChildAtNode)
                    : countNodes - lastChildId

                // Создания рандомного кол-ва узлов
                for (let i = 0; i < countChildren; i++) {
                    const child = {
                        id: lastChildId + 1,
                        properties: generateRandomProperties({})
                    }
                    node.children.push(child);
                    currentLevelNodes.push(child);
                    lastChildId = child.id;
                }
            }

            if (currentLevelNodes.at(-1).id !== countNodes)
                foo(currentLevelNodes);

            return;
        }

        return currentLevelNodes;

    }

    return generateByLevelsRecursion();
}

const tree = generateTree({countNodes: 3000});

fs.writeFileSync('./data.json', JSON.stringify(tree));
