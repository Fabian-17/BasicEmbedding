import OpenAI from "openai";
import { sequelize } from "./src/database/configDB.js";
import { Embeddings } from "./src/models/embeddings.js";
import { config } from "./src/config/config.js";


// Configuración OpenAI
const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY
});

async function createEmbeddingForText(label) {
    try {
        // Crea el embedding para el texto
        const response = await openai.embeddings.create({
            model: "text-embedding-3-large", // Modelo de embeddings de OpenAI
            input: label
        });

        
        // Verifica si la estructura es la correcta
        if (Array.isArray(response.data) && response.data.length > 0) {
            const embedding = response.data[0].embedding;

            // Convierte el embedding a JSON antes de guardarlo en la base de datos
            const embeddingJSON = JSON.stringify(embedding);

            // Guarda el texto y el embedding en la base de datos como cadena JSON
            await Embeddings.create({ label, embedding: embeddingJSON });


            console.log(`Embedding creado y guardado para: "${label}"`);
        } else {
            console.error('La estructura de la respuesta no es la esperada:', response);
        };
    } catch (error) {
        console.error('Error creando el embedding:', error);
    }
}

async function main() {
    try {
        // Sincroniza el modelo (crea la tabla si no existe)
        await sequelize.sync();

        // Lista de textos para los cuales crea el embeddings
        const texts = [
            "Este es el primer texto.",
            "Aquí hay otro ejemplo.",
            "Generación de embeddings con OpenAI."
        ];

        for (const label of texts) {
            await createEmbeddingForText(label);
        }

        console.log('Embeddings creados con éxito.');
    } catch (error) {
        console.error('Error en el proceso principal:', error);
    } finally {
        // Cierra la conexión a la base de datos
        await sequelize.close();
    }
}

main();