<?php
add_theme_support('post-thumbnails');

/* Remove junk from wp_head() */
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_resource_hints', 2);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('template_redirect', 'rest_output_link_header', 11, 0);
remove_action( 'wp_head', 'rest_output_link_wp_head');

/* Remove junk in wp_footer() */
add_action( 'wp_footer', function () {
    wp_deregister_script('wp-embed');
});
