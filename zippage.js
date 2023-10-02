// const {Console} = require('console');
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';


function zipfile() {
    // generation GUID
    GUID = uuidv4();
    // console.log(GUID)

    // generation de la date
    let today = new Date();
    // console.log(today);

    // jour
    let jj = today.getDate();
    // mois
    let mm = today.getMonth() + 1;
    // année
    let aaaa = today.getFullYear();

    if (jj < 10) {
        jj = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    // formattage du nom de fichier
    today = aaaa + mm + jj;

    console.log(today);

    name_file = today + '_' + GUID
    // console.log(name_file)

    // zippage


    // Remplacez ces valeurs par les chemins de vos fichiers
    const fichiersSource = './source/*';
    const fichierDestination = './destination/' + name_file + '.zip';

    // Commande pour compresser les fichiers avec 7-Zip
    const commande = `7z a -v1m "${fichierDestination}" "${fichiersSource}"`;

    exec(commande, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur : ${
                error.message
            }`);
            return;
        }
        if (stderr) {
            console.error(`Erreur de sortie standard : ${stderr}`);
            return;
        }
        console.log(`Sortie standard : ${stdout}`);
    });
}

zipfile()