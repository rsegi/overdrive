SET
    search_path TO public;

BEGIN WORK;

SET
    TRANSACTION READ WRITE;

SET
    datestyle = DMY;

INSERT INTO
    Categories ("id", "name", "image")
VALUES
    (
        'bf8cd36d-9892-493b-8b91-308d0eaabcc6',
        'Guitars',
        'img/guitars.png'
    );

INSERT INTO
    Categories ("id", "name", "image")
VALUES
    (
        '9191c817-1319-4f36-893e-188ac7a7550d',
        'Pianos',
        'img/pianos.png'
    );

INSERT INTO
    Categories ("id", "name", "image")
VALUES
    (
        'ee1da353-352f-48d1-9549-2d615ac6cb7e',
        'Drums',
        'img/drums.png'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        '0783b45f-2052-47e2-907b-021eee31733b',
        'Guitar 1',
        5,
        300,
        'img/guitar1.png',
        'Description Guitar 1',
        'bf8cd36d-9892-493b-8b91-308d0eaabcc6'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        '25c23801-d99e-41ca-b755-0243279102be',
        'Guitar 2',
        5,
        700,
        'img/guitar2.png',
        'Description Guitar 2',
        'bf8cd36d-9892-493b-8b91-308d0eaabcc6'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        '50eb313e-e766-4c65-8491-4940a821c984',
        'Guitar 3',
        5,
        199,
        'img/guitar3.png',
        'Description Guitar 3',
        'bf8cd36d-9892-493b-8b91-308d0eaabcc6'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        '7e1dbcc9-8b6c-4bd3-8cfa-afce699573b1',
        'Piano 1',
        5,
        550,
        'img/piano1.png',
        'Description Piano 1',
        '9191c817-1319-4f36-893e-188ac7a7550d'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        '88f95190-cf8f-4086-86b1-353d68dc6171',
        'Piano 2',
        5,
        850,
        'img/piano2.png',
        'Description Piano 2',
        '9191c817-1319-4f36-893e-188ac7a7550d'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        '8dbbd84b-5bda-4aaa-976e-63a1587a904b',
        'Piano 3',
        5,
        1550,
        'img/piano3.png',
        'Description Piano 3',
        '9191c817-1319-4f36-893e-188ac7a7550d'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        '9be16cd5-da7f-47c1-b20b-a4303a26a00e',
        'Drum 1',
        5,
        1550,
        'img/drum1.png',
        'Description Drum 1',
        'ee1da353-352f-48d1-9549-2d615ac6cb7e'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        'c0f6dfc9-6b87-46e0-b87a-8ba0337868b7',
        'Drum 2',
        5,
        2299,
        'img/drum2.png',
        'Description Drum 2',
        'ee1da353-352f-48d1-9549-2d615ac6cb7e'
    );

INSERT INTO
    Products (
        "id",
        "name",
        "amount",
        "price",
        "image",
        "description",
        "id_category"
    )
VALUES
    (
        'e6b3c97c-c47e-4401-bed4-012cea486929',
        'Drum 3',
        5,
        699,
        'img/drum3.png',
        'Description Drum 3',
        'ee1da353-352f-48d1-9549-2d615ac6cb7e'
    );

COMMIT;