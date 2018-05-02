<?php
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header>
    <?php
    $attached_images = getAttachedImages(get_the_id());
    if (count($attached_images) > 1) {
        // merry-go-around with images
        // simply swap-in and swap-out items..
?>
<ul style="list-style-type:none;">
<?php
foreach ($attached_images as $image) {
    $image_data = wp_get_attachment_image_src($image->ID, [300, 300]);
    $img_alt = get_post_meta($image->ID, '_wp_attachment_image_alt', true);
    $img_caption = $image->post_excerpt;
    $img_height = $image_data[2];
    $img_src = $image_data[0];
    $img_width = $image_data[1];
    ?>
    <li>
        <figure>
            <img
                alt="<?= $img_alt; ?>"
                src="<?= $img_src; ?>"
                width="<?= $img_width; ?>"
                height="<?= $img_height; ?>"
            >
            <figcaption><?= $img_caption; ?></figcaption>
        </figure>
    </li>
    <?php
}
?>
</ul>
<?php
    } else {
        if (has_post_thumbnail()) {
            $thumbnail_post = get_post(get_post_thumbnail_id());
            $thumbnail_alt = get_post_meta($thumbnail_post->ID, '_wp_attachment_image_alt', true);
            $thumbnail_caption = $thumbnail_post->post_excerpt;
            $thumbnail_description = $thumbnail_post->post_content;
            $thumbnail_src = get_the_post_thumbnail_url(get_the_ID(), [300, 300]);
    ?>
        <figure>
            <img
                alt="<?= $thumbnail_alt; ?>"
                src="<?= $thumbnail_src; ?>"
                width="300"
                height="300"
            >
            <figcaption><?= $thumbnail_caption; ?></figcaption>
        </figure>
    <?php
        }
    }
    if (is_single()) {
        the_title('<h1>', '</h1>');
    } elseif (is_front_page() && is_home()) {
        the_title('<h3><a href="'.esc_url(get_permalink()).'" rel="bookmark">','</a></h3>');
    } else {
        the_title('<h2><a href="'.esc_url(get_permalink()).'" rel="bookmark">','</a></h2>');
    }
    ?>
    </header>
    <?php the_content(); ?>
    <footer><?= the_author(); ?></footer>
</article>