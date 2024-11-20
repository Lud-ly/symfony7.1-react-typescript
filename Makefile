.PHONY: deploy install npm-install build

deploy:
	@echo "Starting deployment... 🚀"
	ssh -i ~/.ssh/id_ed25519 pw2zpk_ludom@pw2zpk.ftp.infomaniak.com 'cd sites/info.devlm.fr && git pull origin main && make install'
	@echo "Deployment successful! 🎉✅"

install: vendor/autoload.php
	@echo "Executing make install..."
	/opt/php8.2/bin/php bin/console d:m:m -n
	/opt/php8.2/bin/composer dump-env prod
	/opt/php8.2/bin/php bin/console cache:clear
	make npm-install
	@echo "Installation successful! 🎉✅"

vendor/autoload.php: composer.json composer.lock
	@echo "Installing dependencies with Composer..."
	composer install --no-dev --optimize-autoloader
	touch vendor/autoload.php
	@echo "Composer installation complete! 🎉✅"

npm-install:
	@echo "Installing NPM dependencies..."
	npm install --legacy-peer-deps
	make build
	@echo "NPM dependencies installed! 🎉✅"

build:
	@echo "Running npm run build...💪"
	npm run build
	@echo "🚀 Deploying to production... 🚀"

	@echo "Build successful! 🏆,🌟"