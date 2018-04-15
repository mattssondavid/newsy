<?php
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    <?php
        include(dirname(__FILE__) . '/assets/style/critical.css');
    ?>
    </style>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php
    if (is_home() && !is_front_page()) {
        get_template_part('wp_template_partials/post/header', 'single');
    } else {
        get_template_part('wp_template_partials/post/header', 'nonsingle');
    }
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            get_template_part('wp_template_partials/post/content', get_post_format());
        }
    } else {
        get_template_part('wp_template_partials/post/content', 'none');
    }
    ?>
</body>
</html>
