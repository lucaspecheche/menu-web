<template>
    <div id="chart">
        <section class="section is-main-section">
            <card-component title="Performance" icon="chart-bell-curve" class="tile is-child">
            <vue-apex-charts type="line" height="350" :options="chartOptions" :series="series"></vue-apex-charts>
            </card-component>
        </section>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'
    import CardComponent from '../components/CardComponent'
    //import config from './LineChart'
    import api from '../http/api'

    export default {
        name: 'Dashboard',
        components: {
            VueApexCharts, CardComponent
        },
        data () {
            return {
                series: [],
                chartOptions: {
                    chart: {
                        defaultLocale: 'pt-br',
                        locales:[{
                            "name": "pt-br",
                            "options": {
                                "months": [
                                    "Janeiro",
                                    "Fevereiro",
                                    "Março",
                                    "Abril",
                                    "Maio",
                                    "Junho",
                                    "Julho",
                                    "Agosto",
                                    "Setembro",
                                    "Outubro",
                                    "Novembro",
                                    "Dezembro"
                                ],
                                "shortMonths": [
                                    "Jan",
                                    "Fev",
                                    "Mar",
                                    "Abr",
                                    "Mai",
                                    "Jun",
                                    "Jul",
                                    "Ago",
                                    "Set",
                                    "Out",
                                    "Nov",
                                    "Dez"
                                ],
                                "days": [
                                    "Domingo",
                                    "Segunda",
                                    "Terça",
                                    "Quarta",
                                    "Quinta",
                                    "Sexta",
                                    "Sábado"
                                ],
                                "shortDays": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                                "toolbar": {
                                    "exportToSVG": "Baixar SVG",
                                    "exportToPNG": "Baixar PNG",
                                    "exportToCSV": "Baixar CSV",
                                    "menu": "Menu",
                                    "selection": "Selecionar",
                                    "selectionZoom": "Selecionar Zoom",
                                    "zoomIn": "Aumentar",
                                    "zoomOut": "Diminuir",
                                    "pan": "Navegação",
                                    "reset": "Reiniciar Zoom"
                                }
                            }
                        }],
                        height: 350,
                        type: 'line',
                    },
                    stroke: {
                        width: 7,
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: [],
                    },
                    title: {
                        align: 'left',
                        style: {
                            fontSize: "16px",
                            color: '#666'
                        }
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            gradientToColors: [ '#FDD835'],
                            shadeIntensity: 1,
                            type: 'horizontal',
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100, 100, 100]
                        },
                    },
                    markers: {
                        size: 4,
                        colors: ["#FFA41B"],
                        strokeColors: "#fff",
                        strokeWidth: 2,
                        hover: {
                            size: 7,
                        }
                    },
                    yaxis: {
                        min: -10,
                        max: 40,
                        title: {
                            text: 'Vendas',
                        },
                    }
                },
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData () {
                api.get('report').then(response => {
                    console.log(response.data.categories)

                    this.chartOptions = {...this.chartOptions, ...{
                            xaxis: {
                                type: 'datetime',
                                categories: response.data.categories,
                            }
                        }};

                    this.series = [{
                        name: 'Panelas',
                        data: response.data.data
                    }]

                    //console.log( this.chartOptions.xaxis, this.series)
                })
            }
        }

    }
</script>
