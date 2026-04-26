const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'xingamentos.json');

function loadDB() {
    try {
        if (fs.existsSync(dbPath)) {
            return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        }
    } catch (e) {
        console.error("Erro ao carregar xingamentos.json:", e);
    }
    return { grupos: {}, advertencias: {}, palavras: [] };
}

function saveDB(db) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    } catch (e) {
        console.error("Erro ao salvar xingamentos.json:", e);
    }
}

const xingamentosManager = {
    isAtivo: (groupId) => {
        const db = loadDB();
        return db.grupos[groupId] === true;
    },
    setAtivo: (groupId, status) => {
        const db = loadDB();
        db.grupos[groupId] = status;
        saveDB(db);
    },
    getAdvertencias: (groupId, userId) => {
        const db = loadDB();
        if (!db.advertencias[groupId]) return 0;
        return db.advertencias[groupId][userId] || 0;
    },
    addAdvertencia: (groupId, userId) => {
        const db = loadDB();
        if (!db.advertencias[groupId]) db.advertencias[groupId] = {};
        db.advertencias[groupId][userId] = (db.advertencias[groupId][userId] || 0) + 1;
        const count = db.advertencias[groupId][userId];
        saveDB(db);
        return count;
    },
    resetAdvertencias: (groupId, userId) => {
        const db = loadDB();
        if (db.advertencias[groupId] && db.advertencias[groupId][userId]) {
            delete db.advertencias[groupId][userId];
            saveDB(db);
        }
    },
    checkPalavrao: (text) => {
        if (!text) return false;
        const db = loadDB();
        const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return db.palavras.some(p => {
            const pNorm = p.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const regex = new RegExp(`\\b${pNorm}\\b`, 'i');
            return regex.test(normalized) || normalized.includes(pNorm);
        });
    },
    addPalavra: (palavra) => {
        const db = loadDB();
        const p = palavra.toLowerCase().trim();
        if (!db.palavras.includes(p)) {
            db.palavras.push(p);
            saveDB(db);
            return true;
        }
        return false;
    },
    removePalavra: (palavra) => {
        const db = loadDB();
        const p = palavra.toLowerCase().trim();
        if (db.palavras.includes(p)) {
            db.palavras = db.palavras.filter(item => item !== p);
            saveDB(db);
            return true;
        }
        return false;
    },
    clearPalavras: () => {
        const db = loadDB();
        db.palavras = [];
        saveDB(db);
    },
    getPalavras: () => {
        const db = loadDB();
        return db.palavras || [];
    }
};

module.exports = xingamentosManager;
