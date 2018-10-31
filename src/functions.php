<?php
add_theme_support('post-thumbnails');

/*******************************************************************************
 * Remove junk from wp_head()
 ******************************************************************************/
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_head', 'wp_resource_hints', 2);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('template_redirect', 'rest_output_link_header', 11, 0);

/*******************************************************************************
 * Remove junk in wp_footer()
 ******************************************************************************/
add_action( 'wp_footer', function () {
    wp_deregister_script('wp-embed');
});

/*******************************************************************************
 * Add support for a web manifest
 ******************************************************************************/
function getManifestPath() {
    return esc_url(add_query_arg('webmanifest', '1', get_home_url()));
}
add_filter('query_vars', function ($vars) {
    $vars[] = 'webmanifest';
    return $vars;
});
add_action('template_redirect', function () {
    global $wp_query;
    if ($wp_query->get('webmanifest')) {
        $theme_colour = 'white';
        $background_colour = 'white';
        $manifest = [
            'background_color' => $background_colour,
            'description' => get_bloginfo('description'),
            'display' => 'standalone',
            'lang' => get_bloginfo('language'),
            'name' => get_bloginfo('name'),
            'scope' => '/',
            'short_name' => get_bloginfo('name'),
            'start_url' => get_bloginfo('url'),
            'theme_color' => $theme_colour,
            'icons' => [
                [
                    'src' => get_template_directory_uri() . '/assets/icon/launcher_icon_192.png',
                    'type' => 'image/png',
                    'sizes' => '192x192'
                ],
                [
                    'src' => get_template_directory_uri() . '/assets/icon/launcher_icon_512.png',
                    'type' => 'image/png',
                    'sizes' => '512x512'
                ],
            ],
        ];
        wp_send_json($manifest);
    }
});

/**
 * Get the post's images attachments. If the post has a set featured image then
 * set that as the first WP_Post instance
 *
 * @param int $postId
 *
 * @return \WP_Post[]
 */
function getAttachedImages(int $postId)
{
    $attachments = get_attached_media('image', $postId);
    if (has_post_thumbnail($postId)) {
        $featured_image = get_post(get_post_thumbnail_id($postId));
        if (is_object($featured_image)) {
            $ids = array_map(
                function ($wpPost) {
                    return $wpPost->ID;
                },
                $attachments
            );
            $featured_image_index = array_search($featured_image->ID, $ids);
            unset($attachments[$featured_image_index]);
            $attachments = array_merge([$featured_image], $attachments);
        }
    }
    return $attachments;
}

/**
 * Populate the theme's inline header CSS
 * The function should echo its results
 *
 * @return void
 */
add_action(
    'header_inline_css',
    function () {
        include(dirname(__FILE__) . '/assets/style/critical.css');
    },
    10,
    0
);

/**
 * Curry function
 *
 * @param callable $callable
 *
 * @return closure
 */
function curry(callable $callable)
{
    $args = func_get_args();
    $outerArgs = array_slice($args, 1, count($args));
    return function () use ($callable, $outerArgs) {
        $innerArgs = func_get_args();
        $leftCurry = array_merge($outerArgs, $innerArgs); // f(a, b) does f(a) => f(b)
        $rightCurry = array_merge($innerArgs, $outerArgs); // f(a, b) does f(b) => f(a)
        return call_user_func_array(
            $callable,
            $leftCurry
        );
    };
}

/**
 * Compose function
 *
 * @param callable $f
 * @param callable $g
 */
function compose($f, $g)
{
    return function ($value) use ($f, $g) {
        return $f($g($value));
    };
}

/**
 * Pipe function
 */
function pipe($f, $g)
{
    return function ($value) use ($f, $g) {
        return $g($f($value));
    };
}
