<?php
get_header();
if (is_home() && is_front_page()) {
    get_template_part('wp_template_partials/post/header', 'nonsingle');
} else {
    get_template_part('wp_template_partials/post/header', 'single');
}
if (have_posts()) {
    while (have_posts()) {
        the_post();
        if (is_home() && is_front_page()) {
            get_template_part('wp_template_partials/post/content', 'teaser');
        } else {
            get_template_part('wp_template_partials/post/content', get_post_format());
        }
    }
} else {
    get_template_part('wp_template_partials/post/content', 'none');
}
get_template_part('wp_template_partials/post/footer', '');
get_footer();
