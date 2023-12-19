const fs = require('fs');
const path = require('path');

function trouverSousRepertoire(file, dir) {
    let sousRepertoire = '';
    fs.readdirSync(dir).forEach(subDir => {
        let fullPath = path.join(dir, subDir);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (fs.readdirSync(fullPath).includes(file)) {
                sousRepertoire = subDir;
            }
        }
    });
    return sousRepertoire;
}

function parcourirRepertoire(dir, normalDir, shinyDir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (!fs.lstatSync(fullPath).isDirectory() && path.extname(fullPath) === ".gif") {
            let sousRepertoire = trouverSousRepertoire(file, normalDir);
            if (sousRepertoire) {
                let nouveauNom = path.join(shinyDir, sousRepertoire, file);
                fs.renameSync(fullPath, nouveauNom);
            }
        }
    });
}

parcourirRepertoire('./encounter/to place', './encounter/normal', './encounter/shiny');