tailwind.config = {
    theme: {
        extend: {
            colors: {
                matcha: {
                    deep:  '#3D6B4F',
                    mid:   '#6A9E7B',
                    light: '#C2DBC9',
                    pale:  '#EBF4EE',
                },
                strawberry: '#D93057',
                berry:      '#F5B8C8',
                cream:      '#F8F5EF',
                gold:       '#C9A84C',
                ink: {
                    DEFAULT: '#1A1A18',
                    soft:    '#4A4A46',
                    muted:   '#8A8A84',
                },
                /* keep gray for any legacy classes still in HTML */
                gray: {
                    50:  '#f9fafb',
                    100: '#f3f4f6',
                    800: '#1f2937',
                    900: '#111827',
                },
            },
            fontFamily: {
                serif: ['"DM Serif Display"', 'serif'],
                sans:  ['"DM Sans"', 'sans-serif'],
            },
        }
    }
}
