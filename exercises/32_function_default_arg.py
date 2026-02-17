# <replaceAll targets='["_FUNC1_"]' with='["foo","bar","baz"]' />
# <select>
# <option>
def _FUNC1_(s=1):# <replace p="1.0" from='"s=1"' to='["s","s=1","s=2","s=3","s=4"]' />
    print(f"s={s}")

_FUNC1_(2)# <replace p="1.0" from='"2"' to='["", "1", "2"]' />
# </option>
# <option>
def _FUNC1_(name="d"):# <replace p="1.0" from='"name=\"d\""' to='["name=\"d\"","name"]' />
    print(f"{name}")

_FUNC1_(a)# <replace p="1.0" from='"a"' to='["", "\"a\"", "\"b\""]' />
# </option>
# </select>

# <explanation>
# Key points:
# - Default arguments are set with = in the definition: def func(a, b=10)
# - When calling a function, default arguments can be omitted
# </explanation>