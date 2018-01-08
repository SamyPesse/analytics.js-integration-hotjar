# analytics.js-integration-hotjar

Hotjar integration for [Analytics.js][].

## Options

```js
{
    Hotjar: {
        hjid: '....',
        hjsv: 5,
        // Track event name as tag on recordings
        tagEvents: true,
        // Tags to append when identifying an user
        identifyTags: [ 'Logged In User' ],
        // false to start recording only users.
        recordVisitors: true
    }
}
```


## License

Released under the [MIT license](LICENSE).


[Analytics.js]: https://segment.com/docs/libraries/analytics.js/
