FROM wordpress:6.6-php8.3-apache

COPY wordpress/plugins/cocob-core /var/www/html/wp-content/plugins/cocob-core

RUN { \
    echo 'upload_max_filesize = 32M'; \
    echo 'post_max_size = 32M'; \
    echo 'memory_limit = 256M'; \
  } > /usr/local/etc/php/conf.d/cocob-uploads.ini

EXPOSE 80
