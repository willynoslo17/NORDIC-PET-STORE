# CURSOR-PENDIENTES — animedel-no

Auditoría 2026-10-23. Rama `cursor/animedel-no-auditoria-2026-10` desde `main`. PR contra `main`. Nada fusionado, nada desplegado, nada borrado. PRs abiertos #3 y #5 no se han tocado.

## Hecho en esta rama

- Texto visible al cliente sin nombres de proveedor en `personvern.html`, `slik-handler-du.html` y `frakt-og-levering.html`. Se mantienen los plazos y los lugares que ya estaban escritos.
- `supplier-bridge.js` ya no tiene el mapa de etiquetas de marca. El nombre que se pinta es Animedel. Si un título o una categoría trae el nombre de un proveedor, se quita antes de mostrarlo.
- Notas legibles de `supplier-config.json` sin nombres de marca. Las claves del archivo no se han renombrado.
- `docs/ordrebekreftelse-mal.md` y `docs/voec-mva-sjekkliste.md`.
- Búsqueda (sin distinguir mayúsculas) de la app de mensajería prohibida en tiendas nórdicas: sin resultados.
- `git grep` de `sk_live_` / `sk_test_` con cuerpo de clave: vacío. La comprobación `startsWith("sk_live_")` en `functions/api/create-checkout-session.ts` no se ha modificado.
- Enlaces internos de los `.html`: 493 comprobados. El único aviso es la plantilla `${escAttr(p.image)}` dentro del script de `index.html`, no un enlace roto.
- SuperGrok: ninguno. Favicon, `og-image.png` y `og-image.svg` ya están en el repo.

## Por confirmar — no se ha hecho

1. **Rentabilidad de cada producto.** `catalog/selected-products.json` solo tiene `priceNok`. No hay coste ni margen en el JSON público. No se ha marcado ningún producto como oculto y no se ha borrado ninguno.
2. **Certificación.** El catálogo público no trae `hasCECertification` ni otro certificado. No se puede saber si un SKU está certificado. Estos del fallback local parecen eléctricos, de cuidado o fuera del filtro que el catálogo en vivo ya usa para excluir términos eléctricos; se dejan como están:
   - Smart fôrautomat med timer — `1403906272893472768` / `CJJT1172330`
   - Ultralyd enhet mot bjeffing — `1552199535110402048` / `CJJT1533120`
   - Halsbånd mot bjeffing — `1547613014139088896` / `CJJT1525461`
   - Munnpleie til hund — `4A1B657F-AFCD-4B31-AA28-123AB226D4B0` / `CJJJJTJT41045`
   - Lekehus til hamster — `1356505664368807936` / `CJJT1004053`
   - El resto de los 30 productos del mismo archivo, y el conjunto en vivo, igual: **por confirmar**.
3. **Stripe → modo prueba:** hecho con OK del dueño (2026-10-23); el código exige `sk_test_`.
4. **Nombre del proyecto en Cloudflare Pages.** No hay workflow ni `wrangler.toml`. El despliegue está fuera del repo. `netlify.toml` y `_redirects` no se han tocado.
5. **Fotos de producto.** Las URL de `catalog/selected-products.json` apuntan a un host cuyo nombre incluye al proveedor. No se sustituyen: las imágenes las pone el dueño. Hasta que el archivo nuevo esté en el repo, la referencia actual se queda.
6. **SKU.** Varios empiezan por las letras del proveedor. No salen en la ficha. No se han cambiado, porque el emparejado del checkout usa ese código.
7. **`supplier-config.json` es público** porque la raíz del sitio se publica entera. Las notas ya no nombran marcas. Las claves y `shopId` siguen en el archivo. Quitar el archivo del sitio público exigiría `_redirects` o `netlify.toml`, que no se tocan.
8. **`README.md` y `STRIPE-SETUP.md`** nombran proveedores y también se sirven desde la raíz. Son notas de operación, no páginas de la tienda. No se han reescrito.
9. **`functions/` no se ha tocado.** La respuesta de catálogo incluye un campo de marca con el nombre del proveedor. La tienda lo sustituye por Animedel antes de pintar la ficha. Cambiar esa respuesta sería editar `functions/`.
10. **Comentarios en el JavaScript de la tienda** (`supplier-bridge.js`, `variant-picker.js`, `commerce-runtime.js`) siguen nombrando el origen en comentarios. No se renderizan. Las rutas `/api/...` tampoco se han renombrado.
11. **VOEC / MVA.** Si este ENK, ya descrito en la web como registrado en el registro de MVA, debe usar VOEC o MVA ordinaria: **por confirmar**. Umbral, número VOEC y si el 25 % que ya dice el pie de página vale para todo el catálogo: **por confirmar**. Ver `docs/voec-mva-sjekkliste.md`.
12. **Kassen sigue apagada** (`CHECKOUT_ENABLED` en falso, en la página y en la función). No se ha encendido.
13. **Canal `/pe/`.** Vive en los PR #3 y #5. Esta rama sale de `main` y no los duplica.
14. **Consola de `index.html`.** Hecho: ver «Verificación local».

## Verificación local (2026-10-23, continuación en local tras corte del agente)

- Enlaces internos de todos los `.html`: comprobados con script, 0 rotos.
- `index.html` cargado en Chrome headless con servidor estático: sin errores de JavaScript. Solo 404 de `/api/cj-products` y `/api/newsletter` (Pages Functions, no existen en un servidor estático local; esperado).
- `node --check` en los `.js` de la raíz: OK. No hay `package.json` ni build.
- Búsqueda de claves `sk_live_`/`sk_test_`/`ghp_`/`EAA`: vacía. `create-checkout-session.ts` sin cambios respecto a `main`.
