# PG8 AJAX Page Loader

A modern re-implementation of AJAX page loading (better known as infinite scrolling) for use with WordPress. Requires [jQuery](https://jquery.com/), [HTML5 History API](https://github.com/devote/HTML5-History-API), and [spin.js](https://github.com/fgnass/spin.js).

* Loads new content on click and when the scroll position falls between specified points.
* Displays a loading spinner when content is loading.
* Smoothly scrolls to new page.
* Updates URL with current page after scrolling stops.
* Compatible with Google Analytics (universal and legacy support).



## Installation

Install via Bower:

```bower install pg8-loader -D```

Integrate into your theme however you wish. Be sure to include all JavaScript dependencies. See [Pendrell](https://github.com/synapticism/pendrell) for examples of usage.



## Setup

You will need to add some code to your `functions.php` file (or equivalent) to provision the front-end script with necessary data. Here is an example:

```language-php
global $wp_query;

$max = $wp_query->max_num_pages;
$paged = ( get_query_var( 'paged' ) > 1 ) ? get_query_var( 'paged' ) : 1;

$pg8_vars = array(
  'startPage'   => $paged,
  'maxPages'    => $max,
  'nextLink'    => next_posts( $max, false ),
  'contentSel'  => 'main'
  'nextSel'     => '.nav-next'
);

wp_localize_script( $handle, 'PG8Data', $pg8_vars );
```



## License

MIT/GPLv3.
