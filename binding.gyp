{
    'targets': [
        {
            'target_name': 'PARSER',
            'sources': ['parse_wrap.cxx','libdata.cxx'],
            'include_dirs': ['./'],
            'cflags_cc': ['-fexceptions', '-Wno-deprecated-declarations', '-Wno-unused-but-set-variable','-std=gnu++1z']
        }
    ]
}
