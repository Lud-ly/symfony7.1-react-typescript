.PHONY: deploy install
deploy:
	ssh -i ~/.ssh/id_ed25519 pw2zpk_ludom@pw2zpk.ftp.infomaniak.com 'cd sites/info.devlm.fr && git pull --rebase origin main && make install'

install: vendor/autoload.php
	@echo "Executing make install..."
	/opt/php8.2/bin/php bin/console d:m:m -n
	/opt/php8.2/bin/composer dump-env prod
	/opt/php8.2/bin/php bin/console cache:clear

vendor/autoload.php: composer.json composer.lock
	@echo "Installing dependencies with Composer..."
	composer install --no-dev --optimize-autoloader
	touch vendor/autoload.php