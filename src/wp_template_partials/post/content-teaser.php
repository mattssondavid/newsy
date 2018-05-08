<?php
?>
<newsy-teaser></newsy-teaser>
<article>
    <?php if (has_post_thumbnail()) {
        $thumbnail_post = get_post(get_post_thumbnail_id());
        $thumbnail_alt = get_post_meta($thumbnail_post->ID, '_wp_attachment_image_alt', true);
        $thumbnail_src = get_the_post_thumbnail_url(get_the_ID(), [200, 200]);
        $article_src = esc_url(get_permalink());
    ?>
<a
    href="<?= $article_src; ?>"
>
    <img
        alt="<?= $thumbnail_alt; ?>"
        src="<?= $thumbnail_src; ?>"
        width="200"
        height="200"
    >
</a>
    <?php
    } ?>
    <header>
    <?php the_title('<h3><a href="'.esc_url(get_permalink()).'" rel="bookmark">','</a></h3>'); ?>
    <p><?php the_category(); ?></p>
    <p><?php the_tags(); ?></p>
    <p>Published <?php the_date();?> at <?php the_time(); ?></p>
    <p>Last modified: <?php the_modified_date(); ?></p>
    </header>
    <!-- main -->
    <?php the_excerpt(); ?>
    <footer>
<?php
$author_url = get_author_posts_url(get_the_author_meta('ID'));
$author_name = get_the_author();
?>
    <p>Written by: <a
        href="<?= $author_url; ?>"
        title="<?= $author_name; ?>"
        rel="author"
    ><?= $author_name; ?></a></p>
    </footer>
</article>