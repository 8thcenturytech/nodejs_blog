module.exports = function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\\s+/g, '-')           // Replace spaces with -
    .replace(/[^a-z0-9\\-]/g, '')    // Remove invalid chars
    .replace(/\\-+/g, '-')           // Collapse dashes
    .replace(/^-+|-+$/g, '');        // Trim dashes
}
