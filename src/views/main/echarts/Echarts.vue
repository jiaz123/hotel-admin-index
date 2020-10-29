<template>
    <div>
        <div>
            <ve-line :data="lineData"></ve-line>
        </div>
        <div>
            <ve-pie :data="pieDate"></ve-pie>
        </div>
    </div>
</template>

<script>
    import VeLine from 'v-charts/lib/line.common';
    import VePie from 'v-charts/lib/pie.common';
    export default {
        name: "Echarts",
        components:{
            VeLine,VePie
        },
        data(){
            return {
                lineData:{
                    columns:["日期","访问用户","下单用户"],
                    rows:[
                        {'日期':'2018-05-22','访问用户':32225,'下单用户':19811},
                        {'日期':'2018-05-23','访问用户':12032,'下单用户':4352},
                        {'日期':'2018-05-24','访问用户':22032,'下单用户':14352},
                    ]
                },
                pieDate:{
                    columns: ['日期', '访问用户'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393 },
                        { '日期': '1/2', '访问用户': 3530 },
                        { '日期': '1/3', '访问用户': 2923 },
                        { '日期': '1/4', '访问用户': 1723 },
                        { '日期': '1/5', '访问用户': 3792 },
                        { '日期': '1/6', '访问用户': 4593 }
                    ]
                }
            }
        }

    }
</script>

<style scoped>

</style>