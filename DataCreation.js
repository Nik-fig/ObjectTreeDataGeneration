const randomString = require('randomString');
const fs = require('fs');
const generateRandomProperties = require('./generateRandomProperties')
const getRandomInt = require('./getRandomInt');

function generateTree({countNodes, maxCountChildAtNode = 3}) {
    const nodesList = [];
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

            nodesList.push(...previousLevelNodes.map(
                node => {
                    childsIds = node.children.map(ch => ch.id)
                    return {
                        ...node, children: childsIds
                    }
                }
            ))

            if (currentLevelNodes.at(-1).id == countNodes)
                nodesList.push(...currentLevelNodes.map(
                    node => {
                        return {
                            ...node, children: []
                        }
                    }
                ))

            if (currentLevelNodes.at(-1).id !== countNodes)
                foo(currentLevelNodes);

            return;
        }

        return currentLevelNodes;

    }

    return [generateByLevelsRecursion(), nodesList];
}

const [tree, list] = generateTree({countNodes: 3000});

fs.writeFileSync('./dataTree.json', JSON.stringify(tree[0]));
fs.writeFileSync('./dataList.json', JSON.stringify(list))
