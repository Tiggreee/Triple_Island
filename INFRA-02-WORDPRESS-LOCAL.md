# INFRA-02 WordPress Local Setup

Decision
- Tool selected: Docker Compose.

Goal
- Every team member can run the same WordPress local environment and access wp-admin.

Prerequisites
- Docker Desktop running.
- Port 10004 and 3307 available.

Run
1. In project root run: docker compose up -d
2. Open: http://localhost:10004
3. Complete WordPress installer.

Expected local values during install
- Database name: cocob_platform
- Database user: cocob_user
- Database password: cocob_password
- Database host: db
- Table prefix: wp_

wp-admin check
1. Open: http://localhost:10004/wp-admin
2. Log in with the admin account created at install.
3. Create one test post and publish.

Export and import baseline
- Export DB baseline:
  docker compose exec db sh -c "mysqldump -u root -proot_password cocob_platform" > infra-wp-baseline.sql
- Import DB baseline:
  docker compose exec -T db sh -c "mysql -u root -proot_password cocob_platform" < infra-wp-baseline.sql

Stop environment
- docker compose down

Completion criteria
- Each teammate can open wp-admin and create one post.
