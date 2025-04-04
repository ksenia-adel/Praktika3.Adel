// https://medium.com/@aleksej.gudkov/how-to-insert-data-from-a-csv-file-into-postgresql-using-node-js-and-pgp-069841308d75
// https://www.bezkoder.com/node-js-csv-postgresql/ 


const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../models');

const results = [];

// read and parse CSV file
fs.createReadStream(path.join(__dirname, '../books.csv'), { encoding: 'utf-8' })
  .pipe(csv({
    mapHeaders: ({ header }) => header.replace(/^\uFEFF/, '') // remove BOM if present
  }))
  .on('data', (data) => {
    console.log('Row title:', data.title);
    results.push(data);
  })
  .on('end', async () => {
    try {
      for (const row of results) {
        const title = row.title?.trim() || 'Untitled';
        const year = parseInt(row.publicationYear?.trim() || '0');

        // extract authors and categories
        const authorNames = row.book_authors
          ? row.book_authors.split(',').map(s => s.trim())
          : ['Unknown Author'];

        const categoryNames = row.categories
          ? row.categories.split(',').map(s => s.trim())
          : ['Unknown'];

        // create book entry
        const book = await db.Book.create({
          title,
          publicationYear: isNaN(year) ? 0 : year
        });

        // link categories to the book
        for (const categoryName of categoryNames) {
          const [category] = await db.Category.findOrCreate({
            where: { name: categoryName },
            defaults: { name: categoryName }
          });
          await book.addCategory(category);
        }

        // link authors to the book
        for (const authorName of authorNames) {
          const [author] = await db.Author.findOrCreate({
            where: { name: authorName },
            defaults: { name: authorName }
          });
          await book.addAuthor(author);
        }

        console.log(`Imported: "${title}"`);
      }

      console.log('All books imported!');
    } catch (err) {
      console.error('Import error:', err.stack || err);
    }
  });
