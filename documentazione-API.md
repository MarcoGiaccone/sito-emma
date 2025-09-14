# Documentazione API

1. Select id
``` let { data: projects, error } = await supabase
  .from('projects')
  .select('id')
```

2. Select property
```let { data: projects, error } = await supabase
  .from('projects')
  .select('title')
```

3. With pagination
```let { data: projects, error } = await supabase
  .from('projects')
  .select('*')
  .range(0, 9)
```

4. With filtering
```let { data: projects, error } = await supabase
  .from('projects')
  .select("*")

  // Filters
  .eq('column', 'Equal to')
  .gt('column', 'Greater than')
  .lt('column', 'Less than')
  .gte('column', 'Greater than or equal to')
  .lte('column', 'Less than or equal to')
  .like('column', '%CaseSensitive%')
  .ilike('column', '%CaseInsensitive%')
  .is('column', null)
  .in('column', ['Array', 'Values'])
  .neq('column', 'Not equal to')

  // Arrays
  .contains('array_column', ['array', 'contains'])
  .containedBy('array_column', ['contained', 'by'])

  // Logical operators
  .not('column', 'like', 'Negate filter')
  .or('some_column.eq.Some value, other_column.eq.Other value')
```

5. Insert rows
```const { data, error } = await supabase
  .from('projects')
  .insert([
    { some_column: 'someValue' },
    { some_column: 'otherValue' },
  ])
  .select()
```

6. Update rows
```const { data, error } = await supabase
  .from('projects')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')
  .select()
```

7. Delete rows
```const { error } = await supabase
  .from('projects')
  .delete()
  .eq('some_column', 'someValue')
```