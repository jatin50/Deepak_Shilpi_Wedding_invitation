const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  const imgDir = path.join(publicDir, 'img');
  const eventsDir = path.join(imgDir, 'events');

  // 1. Arch image: width ~700px, quality 80 -> WebP under 120KB
  if (fs.existsSync(path.join(imgDir, 'arch.jpg'))) {
    await sharp(path.join(imgDir, 'arch.jpg'))
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(imgDir, 'arch.webp'));
    console.log('Optimized arch.webp:', fs.statSync(path.join(imgDir, 'arch.webp')).size, 'bytes');
  }

  // 2. Haldi icon: width ~400px -> WebP under 60KB
  if (fs.existsSync(path.join(eventsDir, 'haldi.webp'))) {
    const tempBuffer = fs.readFileSync(path.join(eventsDir, 'haldi.webp'));
    await sharp(tempBuffer)
      .resize({ width: 400, height: 400, fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(path.join(eventsDir, 'haldi_opt.webp'));
    fs.renameSync(path.join(eventsDir, 'haldi_opt.webp'), path.join(eventsDir, 'haldi.webp'));
    console.log('Optimized haldi.webp:', fs.statSync(path.join(eventsDir, 'haldi.webp')).size, 'bytes');
  }

  // 3. Sangeet icon: width ~400px -> WebP under 60KB
  if (fs.existsSync(path.join(eventsDir, 'sangeet.webp'))) {
    const tempBuffer = fs.readFileSync(path.join(eventsDir, 'sangeet.webp'));
    await sharp(tempBuffer)
      .resize({ width: 400, height: 400, fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(path.join(eventsDir, 'sangeet_opt.webp'));
    fs.renameSync(path.join(eventsDir, 'sangeet_opt.webp'), path.join(eventsDir, 'sangeet.webp'));
    console.log('Optimized sangeet.webp:', fs.statSync(path.join(eventsDir, 'sangeet.webp')).size, 'bytes');
  }

  // 4. Wedding icon: width ~400px -> WebP under 60KB
  if (fs.existsSync(path.join(eventsDir, 'wedding.webp'))) {
    const tempBuffer = fs.readFileSync(path.join(eventsDir, 'wedding.webp'));
    await sharp(tempBuffer)
      .resize({ width: 400, height: 400, fit: 'cover' })
      .webp({ quality: 82 })
      .toFile(path.join(eventsDir, 'wedding_opt.webp'));
    fs.renameSync(path.join(eventsDir, 'wedding_opt.webp'), path.join(eventsDir, 'wedding.webp'));
    console.log('Optimized wedding.webp:', fs.statSync(path.join(eventsDir, 'wedding.webp')).size, 'bytes');
  }

  // 5. Venue illustration: width ~700px -> WebP under 120KB
  if (fs.existsSync(path.join(imgDir, 'venue.webp'))) {
    const tempBuffer = fs.readFileSync(path.join(imgDir, 'venue.webp'));
    await sharp(tempBuffer)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(imgDir, 'venue_opt.webp'));
    fs.renameSync(path.join(imgDir, 'venue_opt.webp'), path.join(imgDir, 'venue.webp'));
    console.log('Optimized venue.webp:', fs.statSync(path.join(imgDir, 'venue.webp')).size, 'bytes');
  }

  // 6. OG Banner: width 1200x630 -> JPEG under 150KB
  if (fs.existsSync(path.join(publicDir, 'og.jpg'))) {
    const tempBuffer = fs.readFileSync(path.join(publicDir, 'og.jpg'));
    await sharp(tempBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(path.join(publicDir, 'og_opt.jpg'));
    fs.renameSync(path.join(publicDir, 'og_opt.jpg'), path.join(publicDir, 'og.jpg'));
    console.log('Optimized og.jpg:', fs.statSync(path.join(publicDir, 'og.jpg')).size, 'bytes');
  }

  // 7. Lace tile: create a delicate 160x160 seamless lace pattern SVG converted to webp
  const laceSvg = `
  <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="160" fill="transparent"/>
    <g fill="none" stroke="rgba(255,255,255,0.32)" stroke-width="1.2">
      <!-- Outer floral rings -->
      <circle cx="80" cy="80" r="54" stroke-dasharray="3,3"/>
      <circle cx="80" cy="80" r="40"/>
      <circle cx="80" cy="80" r="24" stroke-dasharray="2,2"/>
      <circle cx="80" cy="80" r="8"/>
      <!-- Petal loops radiating -->
      <path d="M 80 26 C 72 40 72 60 80 80 C 88 60 88 40 80 26 Z"/>
      <path d="M 80 134 C 72 120 72 100 80 80 C 88 100 88 120 80 134 Z"/>
      <path d="M 26 80 C 40 72 60 72 80 80 C 60 88 40 88 26 80 Z"/>
      <path d="M 134 80 C 120 72 100 72 80 80 C 100 88 120 88 134 80 Z"/>
      <!-- Corner floral accents -->
      <circle cx="0" cy="0" r="30"/>
      <circle cx="160" cy="0" r="30"/>
      <circle cx="0" cy="160" r="30"/>
      <circle cx="160" cy="160" r="30"/>
      <circle cx="0" cy="0" r="44" stroke-dasharray="3,3"/>
      <circle cx="160" cy="0" r="44" stroke-dasharray="3,3"/>
      <circle cx="0" cy="160" r="44" stroke-dasharray="3,3"/>
      <circle cx="160" cy="160" r="44" stroke-dasharray="3,3"/>
    </g>
  </svg>`;

  await sharp(Buffer.from(laceSvg))
    .webp({ quality: 90 })
    .toFile(path.join(imgDir, 'lace.webp'));
  console.log('Created lace.webp:', fs.statSync(path.join(imgDir, 'lace.webp')).size, 'bytes');
}

optimizeImages().catch(err => {
  console.error(err);
  process.exit(1);
});
