# Backend AGENTS.md

## Commands

- `npm run start:dev` - dev with watch (nest start --watch)
- `npm run build` - nest build (deletes old dist/ per nest-cli.json)
- `npm run start:prod` - node dist/main
- `npm run lint` - eslint with prettier
- `npm test` - jest (runs `*.spec.ts` in src/)
- Single test: `npm test -- --testPathPattern="<module>"`
- `npm run migrate` - run TypeORM migrations (uses npm)
- `yarn typeorm migration:generate` - generate migration (uses yarn)
- `yarn typeorm migration:revert` - rollback migration (uses yarn)

## Setup

- Requires `.env` in `backend/` with vars: `PORT`, `ENCRYPTION_KEY`, `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`
- MySQL must be running (XAMPP or manual)
- Database `quero_cafe_bar` must be created manually

## Architecture

- 5 identical modules: `comanda`, `comanda-item`, `mesa`, `produto`, `usuario`
- Each module: controller, service, entity, DTOs (create, update, delete, list)
- TypeORM `autoLoadEntities: true` in `app.module.ts`
- Migrations in `src/database/migrations/`
- Encryption utilities in `src/common/encryption/` with custom TypeORM transformer

## Gotchas

- `tsconfig.json` uses `"module": "nodenext"` with experimental decorators enabled
- CORS allows all origins (dev config)
- Mix of npm (most scripts) and yarn (migration scripts) in package.json
