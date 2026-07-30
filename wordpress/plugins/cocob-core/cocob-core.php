<?php
/**
 * Plugin Name: Coco B Core
 * Description: Core content models for Coco B platform.
 * Version: 0.1.0
 * Author: Coco B Team
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    register_post_type('villa', [
        'labels' => [
            'name' => 'Villas',
            'singular_name' => 'Villa',
        ],
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => true,
        'rewrite' => ['slug' => 'villas'],
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    ]);

    $meta_fields = [
        'suite_capacity' => ['type' => 'integer'],
        'min_stay_nights' => ['type' => 'integer'],
        'bedrooms' => ['type' => 'integer'],
        'bathrooms' => ['type' => 'integer'],
        'location' => ['type' => 'string'],
        'short_description' => ['type' => 'string'],
        'long_description' => ['type' => 'string'],
        'use_cases' => [
            'type' => 'array',
            'schema' => [
                'type' => 'string',
            ],
        ],
        'gallery_urls' => [
            'type' => 'array',
            'schema' => [
                'type' => 'string',
            ],
        ],
    ];

    foreach ($meta_fields as $meta_key => $config) {
        register_post_meta('villa', $meta_key, [
            'single' => true,
            'type' => $config['type'],
            'show_in_rest' => isset($config['schema'])
                ? [
                    'schema' => [
                        'type' => $config['type'],
                        'items' => $config['schema'],
                    ],
                ]
                : true,
            'sanitize_callback' => function ($value) use ($config) {
                if ($config['type'] === 'integer') {
                    return intval($value);
                }

                if ($config['type'] === 'array') {
                    if (!is_array($value)) {
                        return [];
                    }

                    return array_values(array_filter(array_map('sanitize_text_field', $value)));
                }

                return sanitize_text_field($value);
            },
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
});
