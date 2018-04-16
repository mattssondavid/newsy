<?php
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header>
    <?php
    if (is_single()) {
        the_title('<h1>', '</h1>');
    } elseif (is_front_page() && is_home()) {
        the_title('<h3><a href="'.esc_url(get_permalink()).'" rel="bookmark">','</a></h3>');
    } else {
        the_title('<h2><a href="'.esc_url(get_permalink()).'" rel="bookmark">','</a></h2>');
    }
    ?>
    </header>
    <section><?php the_content(); ?></section>
    <footer></footer>
</article>