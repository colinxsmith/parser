{
    'targets': [
        {
            'target_name': 'PARSER',
            'sources': ['parse_wrap.cxx', 'libdata.cxx'],
            'include_dirs': ['./'],
            'conditions': [
                ["OS=='win'", {
                },
                 "OS=='linux'",{
                     'cflags_cc': [ '-fexceptions']
                 }
                 ]
            ]
        }
    ]
}
